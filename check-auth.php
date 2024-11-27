<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    // Get user data from DB
    require_once 'db-connection.php';
    $db = new Database();
    
    try {
        $stmt = $db->conn->prepare("SELECT user_id FROM users WHERE user_id = ?");
        if (!$stmt) {
            throw new Exception("Prepare failed: " . $db->conn->error);
        }
        
        $stmt->bind_param("s", $_SESSION['user_id']);
        if (!$stmt->execute()) {
            throw new Exception("Execute failed: " . $stmt->error);
        }
        
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        
        if ($user) {
            echo json_encode([
                'authenticated' => true,
                'user_id' => $user['user_id'] // Return user_id instead of name
            ]);
        } else {
            echo json_encode(['authenticated' => false]);
        }
        
        $stmt->close();
    } catch (Exception $e) {
        error_log("Database error: " . $e->getMessage());
        echo json_encode([
            'authenticated' => false,
            'error' => 'Database error occurred'
        ]);
    } finally {
        $db->closeConnection();
    }
} else {
    echo json_encode(['authenticated' => false]);
}
?> 
<?php
header('Content-Type: application/json');

// ERROR REPORTING FOR DEBUGGING
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    // Get POST data
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!isset($data['image'])) {
        throw new Exception('No image data received');
    }
//IT SHUD BE SENDING THE IMAGE TO THE AI MODEL
//IT SHOULD BE GETTING THE RESULTS FROM THE AI MODEL
//IT SHOULD BE RETURNING THE RESULTS TO THE CLIENT

    // NOW ONLY FOR TESTING DUMMY DATA
    $response = [
        'success' => true,
        'analysis' => 'Suspected fracture in the temporal lobe detected',
        'confidence' => 85
    ];

    echo json_encode($response);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?> 
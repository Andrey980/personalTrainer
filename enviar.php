<?php
/**
 * GUTO SPINOZA - PERSONAL TRAINER
 * Form Handler - enviar.php
 */

// Configurações
$destinatario = "contato@gutospinoza.com.br";
$assunto_email = "Nova mensagem do site - Guto Spinoza Personal Trainer";

// Resposta padrão
$response = [
    'success' => false,
    'message' => ''
];

// Verifica se é uma requisição POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    $response['message'] = 'Método não permitido.';
    echo json_encode($response);
    exit;
}

// Recebe e sanitiza os dados
$nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$telefone = filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_SPECIAL_CHARS);
$interesse = filter_input(INPUT_POST, 'interesse', FILTER_SANITIZE_SPECIAL_CHARS);
$mensagem = filter_input(INPUT_POST, 'mensagem', FILTER_SANITIZE_SPECIAL_CHARS);

// Validações
if (empty($nome) || empty($email)) {
    $response['message'] = 'Nome e e-mail são obrigatórios.';
    echo json_encode($response);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['message'] = 'E-mail inválido.';
    echo json_encode($response);
    exit;
}

// Mapeamento de interesse
$interesses = [
    'consultoria-online' => 'Consultoria Online',
    'treino-presencial' => 'Treino Presencial',
    'planilha' => 'Planilha de Treino',
    'outro' => 'Outro'
];

$interesse_texto = isset($interesses[$interesse]) ? $interesses[$interesse] : 'Não especificado';

// Monta o corpo do e-mail
$corpo_email = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #c9a54e, #a88a3d); padding: 20px; text-align: center; }
        .header h1 { color: #fff; margin: 0; font-size: 24px; }
        .content { background: #f9f9f9; padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #c9a54e; margin-bottom: 5px; }
        .value { background: #fff; padding: 10px; border-left: 3px solid #c9a54e; }
        .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>Nova Mensagem do Site</h1>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Nome:</div>
                <div class='value'>{$nome}</div>
            </div>
            <div class='field'>
                <div class='label'>E-mail:</div>
                <div class='value'>{$email}</div>
            </div>
            <div class='field'>
                <div class='label'>Telefone:</div>
                <div class='value'>" . ($telefone ?: 'Não informado') . "</div>
            </div>
            <div class='field'>
                <div class='label'>Interesse:</div>
                <div class='value'>{$interesse_texto}</div>
            </div>
            <div class='field'>
                <div class='label'>Mensagem:</div>
                <div class='value'>" . ($mensagem ?: 'Nenhuma mensagem') . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>Mensagem enviada através do site Guto Spinoza Personal Trainer</p>
            <p>Data: " . date('d/m/Y H:i:s') . "</p>
        </div>
    </div>
</body>
</html>
";

// Headers do e-mail
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Site Guto Spinoza <noreply@gutospinoza.com.br>\r\n";
$headers .= "Reply-To: {$nome} <{$email}>\r\n";

// Tenta enviar o e-mail
if (mail($destinatario, $assunto_email, $corpo_email, $headers)) {
    $response['success'] = true;
    $response['message'] = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
    
    // Salva em log (opcional)
    $log = date('Y-m-d H:i:s') . " | {$nome} | {$email} | {$telefone} | {$interesse_texto}\n";
    file_put_contents('logs/contatos.log', $log, FILE_APPEND | LOCK_EX);
    
} else {
    $response['message'] = 'Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato via WhatsApp.';
}

// Retorna resposta JSON para requisições AJAX
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Redireciona para a página inicial com mensagem
$_SESSION['form_response'] = $response;
header('Location: index.php#contato');
exit;

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <title>Área do Aluno | Guto Spinoza</title>
    <?php include 'components/head.php'; ?>
</head>
<body>
    <?php include 'components/header.php'; ?>

<!-- Page Hero -->
<!-- <section class="page-hero" style="background-image: url('img/IMG_4032.jpg'); background-position: center left;">
    <div class="hero-overlay"></div>
    <div class="container">
        <h1 class="page-title">Área do Aluno</h1>
    </div>
</section> -->

<section class="login-section">
    <div class="container">
        <div class="login-card">
            <div class="login-header">
                <span class="section-tag">Acesso exclusivo</span>
                <h2 class="section-title">Faça seu login</h2>
                <p class="section-description">Entre para acessar seu treino, histórico e orientações personalizadas.</p>
            </div>
            <form class="login-form" action="#" method="post">
                <div class="form-group">
                    <label for="login-email">E-mail</label>
                    <input type="email" id="login-email" name="email" placeholder="Seu e-mail" required>
                </div>
                <div class="form-group">
                    <label for="login-password">Senha</label>
                    <input type="password" id="login-password" name="password" placeholder="Sua senha" required>
                </div>
                <button type="submit" class="btn-primary btn-login">Entrar</button>
                <div class="login-links">
                    <a href="#">Esqueci minha senha</a>
                    <span>•</span>
                    <a href="#">Primeiro acesso</a>
                </div>
            </form>
        </div>
    </div>
</section>

<?php include 'components/footer.php'; ?>
</body>
</html>

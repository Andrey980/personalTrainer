<!-- Header -->
<header id="header" style="border-bottom: 1px solid var(--color-gold-dark);">
    <div class="container">
        <nav class="navbar">
            <a href="index.php" class="logo">
                <img src="img/logo.png" alt="Guto Spinoza" class="logo-img" style="max-width:50px; height:auto;">
                <div class="logo-text">
                    <span class="logo-name">Guto Spinoza</span>
                    <span class="logo-subtitle">Personal Trainer</span>
                </div>
            </a>
            
            <ul class="nav-menu">
                <li><a href="index.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'index.php' ? 'active' : ''; ?>">Início</a></li>
                <li><a href="como-funciona.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'como-funciona.php' ? 'active' : ''; ?>">Como Funciona</a></li>
                <li><a href="loja.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'loja.php' ? 'active' : ''; ?>">Loja</a></li>
                <li><a href="clube.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'clube.php' ? 'active' : ''; ?>">Clube de Vantagens</a></li>
                <li><a href="area-aluno.php" class="nav-link btn-area-aluno">Área do Aluno</a></li>
            </ul>
            
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    </div>
</header>

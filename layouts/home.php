<!DOCTYPE html>
<html lang="en" class="light-style layout-menu-fixed" dir="ltr" data-theme="theme-default" data-assets-path="../assets/"
    data-template="vertical-menu-template-free">

<head>
    <meta charset="utf-8" />
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

    <title>Dashboard</title>
    <?php include'../includes/css.php';   ?>

    <meta name="description" content="" />
</head>

<body>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
          
            <!-- Menu -->
            <?php include'../includes/sidebar.php';   ?>


            <!-- Layout container -->
            <div class="layout-page">

                <!-- Navbar -->
                <?php include'../includes/topbar.php';   ?>


                <!-- Content wrapper -->
                <?php include'../components/test.php';   ?>

            </div>

        </div>

    </div>
</body>
<?php include'../includes/js.php';   ?>

</html>
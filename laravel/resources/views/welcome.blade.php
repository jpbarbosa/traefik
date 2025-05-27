<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Laravel on Traefik</title>
        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @vite(['resources/css/app.css', 'resources/js/app.js'])
        @endif
    </head>
    <body>
        <h1>Hello from Laravel {{ app()->version() }} with PHP {{ PHP_VERSION }} on Traefik</h1>
        <p>{{ date('Y-m-d H:i:s') }}</p>
        <p class="vite">Vite is serving assets correctly if you see this text in green.</p>
    </body>
</html>

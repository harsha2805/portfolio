<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>HoloStack | Portfolio</title>

    <!-- SEO -->
    <meta name="description" content="Harshavardhan C — Creative developer crafting interactive web experiences. Explore my projects, skills, and work.">
    <meta name="keywords" content="Harshavardhan, HoloStack, creative developer, web developer, portfolio, React, Laravel, full stack">
    <meta name="author" content="Harshavardhan C">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#050505">
    <link rel="canonical" href="{{ url('/') }}">
    <link rel="icon" href="/favicon.ico">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url('/') }}">
    <meta property="og:title" content="HoloStack | Portfolio">
    <meta property="og:description" content="Harshavardhan C — Creative developer crafting interactive web experiences.">
    <meta property="og:site_name" content="HoloStack">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="HoloStack | Portfolio">
    <meta name="twitter:description" content="Harshavardhan C — Creative developer crafting interactive web experiences.">

    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@@context": "https://schema.org",
        "@@type": "Person",
        "name": "Harshavardhan C",
        "url": "{{ url('/') }}",
        "jobTitle": "Creative Developer",
        "email": "harshavardhan@@holostack.in",
        "sameAs": [
            "https://github.com/harsha2805",
            "https://stackoverflow.com/users/20165200/harshavardhan",
            "https://www.linkedin.com/in/harshavardhan2805"
        ]
    }
    </script>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700&display=swap" rel="stylesheet" />
    <link href="https://fonts.bunny.net/css?family=epilogue:700,800,900&family=manrope:400,500,600&display=swap" rel="stylesheet" />

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>

<body class="bg-[#050505] overflow-x-hidden">
    <div id="app"></div>
</body>

</html>
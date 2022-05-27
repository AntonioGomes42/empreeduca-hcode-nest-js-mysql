export default function homePage() {
    const homePage = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:wght@300&display=swap" rel="stylesheet">
            <title>Antonio Gomes API</title>
            <style>
                *{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Poppins', sans-serif;
                }
                body{
                    overflow: hidden;
                    width: 100%;
                    height: 90vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                h1.text{
                    font-size: 5em;
                    z-index:1;
                }

                img.image{
                    position: absolute;
                    transform: translateX(30em);
                    height: 400px;
                    border-radius: 50%;
                    animation: totoroMove 16000ms infinite;
                }
                @keyframes totoroMove {
                    0%{
                        transform: translateX(30em);
                    }
                    95%{
                        transform: translateX(-80em);
                    }
                }

            </style>
        </head>
        <body>
            <h1 class="text">Antonio Gomes' A.P.I.</h1>
            <img class="image" src="https://64.media.tumblr.com/0b45a228cf5bf35b1f3baf67f3bf472e/tumblr_ni53jibhNf1u7ow6ho1_500.gif" alt="totoro image">
        </body>
        </html>
    `;
    return homePage;
}
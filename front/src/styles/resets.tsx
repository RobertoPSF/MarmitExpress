import { createGlobalStyle } from "styled-components"
import fonts from "google-fonts"

fonts.add({
    'Montserrat': ['1000', '900', '800', '700', '600', '500', '400', '300', '200', '100']
})

const ResetStyles = createGlobalStyle`

    html,
    body {
        padding: 0;
        margin: 0;
        font-family: 'Montserrat';
    }

    h1 {
        padding: 0;
        margin: 0;
    }

    h2 {
        padding: 0;
        margin: 0;
    }

    h3 {
        padding: 0;
        margin: 0;
    }

    p {
        padding: 0;
        margin: 0;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }

`

export default ResetStyles

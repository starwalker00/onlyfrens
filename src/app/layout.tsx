// Root layout (app/layout.js)
// - Applies to all routes
import Header from 'src/components/layout/Header';
import Footer from 'src/components/layout/Footer';

type Props = {
    children: React.ReactNode,
};
export default function RootLayout({ children }: Props) {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>OnlyFrens</title>
            </head>
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    )
}


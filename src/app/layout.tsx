// Root layout (app/layout.js)
// - Applies to all routes
type Props = {
    children: React.ReactNode,
};
export default function RootLayout({ children }: Props) {
    return (
        <html>
            <body>
                {/* <Header /> */}
                {children}
                {/* <Footer /> */}
            </body>
        </html>
    )
}

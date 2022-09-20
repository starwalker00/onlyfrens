// Regular layout (app/explorer/layout.js)
// - Applies to route segments in app/explorer/*
type Props = {
    children: React.ReactNode,
};
export default function ExplorerLayout({ children }: Props) {
    return (
        <>
            {/* <ExplorerSidebar /> */}
            {children}
        </>
    )
}
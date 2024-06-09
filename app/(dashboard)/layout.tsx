import Navbar from "@/components/navbar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-screen overflow-y-scroll">
            <div style={{ maxHeight: "calc(100vh - 4px)", overflowY: "auto" }}>
                <Navbar />
                {children}
            </div>
        </div>
    );
}

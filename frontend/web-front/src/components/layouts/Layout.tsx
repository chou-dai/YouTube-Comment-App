import React, { FC,  memo,  ReactNode } from "react";

type Props = {
    children: ReactNode;
}

const Layout: FC<Props> = memo(function Layout({children}: Props) {
    return (
        <div className="min-h-screen">
            <main>
                <div>
                    {children}
                </div>
            </main>
        </div>
    );
});

export default Layout;
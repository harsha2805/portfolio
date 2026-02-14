import type { PropsWithChildren } from 'react';
import Loader from '../Components/Loader';

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Loader />
            <main>{children}</main>
        </>
    );
}

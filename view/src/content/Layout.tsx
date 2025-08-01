//-Path: "react-choco-style/view/src/content/Layout.tsx"
import { chocoRoutes } from '../App';
import { Outlet } from 'react-router-dom';
import { CTabs, CBox } from '@teachoco-official/react-choco-style';

export default function Layout() {
    return (
        <>
            <CTabs
                lowcase
                selectionFollowsFocus
                options={[
                    { label: 'index', to: '/choco' },
                    ...chocoRoutes.map((option) => ({
                        label: option,
                        to: `/choco/${option}`,
                    })),
                ]}
            />
            <CBox dFlex column p={-8} g={-4}>
                <Outlet />
            </CBox>
        </>
    );
}

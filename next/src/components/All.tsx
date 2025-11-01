//-Path: "react-choco-style/next/src/components/All.tsx"
import C from '@teachoco-official/react-choco-style';

export default function All() {
    return (
        <>
            <C.Alert>success</C.Alert>
            <C.Avatar />
            <C.Badge badgeContent={4}>
                <C.Icon />
            </C.Badge>
            <C.Breadcrumbs separator=">" maxItems={2}>
                <p>Home</p>
                <p>About</p>
                <p>Services</p>
                <p>Pricing</p>
                <p>Contact</p>
            </C.Breadcrumbs>
            <C.Button sz={-16}>button</C.Button>
            <C.Checkbox />
            <C.Chip outline>Chip</C.Chip>
            <C.Container portion="main">
                <C.Container portion="header">Container header</C.Container>
                <C.Container portion="content">Container content</C.Container>
            </C.Container>
            <C.Dialog>dialog</C.Dialog>
            <C.Drawer>drawer</C.Drawer>
            <C.GlobalStyles />
            <C.Icon debug={['sz']} />
            <C.IconButton fa="fa0" />
            <C.Image src="https://picsum.photos/200/300" />
            <C.Input sz={-26} />
            <C.Menu
                handleClick={(event) => {
                    console.log(event);
                }}
            >
                <C.MenuItem>Menu Item 1</C.MenuItem>
                <C.MenuItem>Menu Item 2</C.MenuItem>
                <C.MenuItem>Menu Item 3</C.MenuItem>
            </C.Menu>
            <C.Navbar>navbar</C.Navbar>
            <C.Navigation>
                {({ Action }) => (
                    <>
                        <Action>link</Action>
                    </>
                )}
            </C.Navigation>
            <C.Pagination count={10} />
            <C.Paper shade={9} />
            <C.Progress />
            <C.Rating />
            <C.Skeleton />
        </>
    );
}

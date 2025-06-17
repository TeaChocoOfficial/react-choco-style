//-Path: "react-choco-style/src/view/test/choco/Table.tsx"
import { CTable } from '@teachoco-official/react-choco-style';

export default function Table() {
    const data = {
        head: ['name', 'age'],
        body: [
            ['a', 1],
            ['b', 2],
            ['c', 3],
        ],
    };
    return (
        <>
            <CTable setClr="error">
                {({ Head, Row, Cell, Body }) => (
                    <>
                        <Head>
                            <Row>
                                {data.head.map((head, index) => (
                                    <Cell key={index}>{head}</Cell>
                                ))}
                            </Row>
                        </Head>
                        <Body>
                            {}
                            {data.body.map((row, index) => (
                                <Row key={index}>
                                    {row.map((cell, index) => (
                                        <Cell key={index}>{cell}</Cell>
                                    ))}
                                </Row>
                            ))}
                        </Body>
                    </>
                )}
            </CTable>
        </>
    );
}

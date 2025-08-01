//-Path: "react-choco-style/src/view/test/choco/Dialog.tsx"
import { useState } from 'react';
import {
    CButton,
    CDialog,
    CDialogChildrenProps,
} from '@teachoco-official/react-choco-style';

export default function Dialog() {
    const [open, setOpen] = useState(false);
    const [openbody, setOpenbody] = useState(false);
    const [openfull, setOpenfull] = useState(false);
    const [openpaper, setOpenpaper] = useState(false);

    return (
        <>
            <CButton onClick={() => setOpen(true)}>open</CButton>
            <CDialog open={open}>
                {({ Title, Content, Actions }: CDialogChildrenProps) => (
                    <>
                        <Title>Dialog Title</Title>
                        <Content>This is text in content.</Content>
                        <Actions>
                            <CButton onClick={() => setOpen(false)}>
                                Close
                            </CButton>
                        </Actions>
                    </>
                )}
            </CDialog>

            <CButton onClick={() => setOpenpaper(true)}>open paper</CButton>
            <CDialog open={openpaper}>
                {({ Title, Actions }: CDialogChildrenProps) => (
                    <>
                        <Title>Dialog scroll Paper</Title>
                        {lorem1000}
                        <Actions>
                            <CButton onClick={() => setOpenpaper(false)}>
                                Close
                            </CButton>
                        </Actions>
                    </>
                )}
            </CDialog>

            <CButton onClick={() => setOpenbody(true)}>open body</CButton>
            <CDialog open={openbody} scroll="body">
                {({ Title, Actions }: CDialogChildrenProps) => (
                    <>
                        <Title>Dialog scroll body</Title>
                        {lorem1000}
                        <Actions>
                            <CButton onClick={() => setOpenbody(false)}>
                                Close
                            </CButton>
                        </Actions>
                    </>
                )}
            </CDialog>

            <CButton onClick={() => setOpenfull(true)}>open fullscreen</CButton>
            <CDialog open={openfull} fullScreen>
                {({ Title, Actions }: CDialogChildrenProps) => (
                    <>
                        <Title>Dialog full screen</Title>
                        {lorem1000}
                        <Actions>
                            <CButton onClick={() => setOpenfull(false)}>
                                Close
                            </CButton>
                        </Actions>
                    </>
                )}
            </CDialog>
        </>
    );
}

const lorem1000 = (
    <>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus rerum
        quos ad, fugiat harum aperiam iusto cupiditate beatae dicta quas hic
        assumenda sapiente? Et, impedit sapiente, libero nihil suscipit officiis
        totam corporis eos distinctio quidem nobis necessitatibus pariatur eum
        esse! Suscipit omnis quasi possimus quia molestias earum, magnam
        molestiae unde aut nulla, quas perspiciatis quo laborum id ipsum,
        ducimus reiciendis delectus saepe minima asperiores? Voluptas,
        repellendus quo possimus pariatur voluptatem ea cupiditate. Delectus
        totam, quos doloremque dicta sit, alias temporibus dolorem eveniet hic
        non voluptate aperiam minima maiores aliquam atque ab, nihil similique.
        Numquam accusantium quaerat assumenda officia, doloribus ipsum impedit,
        atque labore dolorum excepturi fuga illo illum a quod consequuntur! Iure
        neque vero numquam quae necessitatibus itaque, qui cum ratione veniam
        nihil excepturi pariatur error autem aliquam quidem at provident
        explicabo, mollitia, modi natus consectetur? Maxime natus dignissimos
        dolorem totam aliquid consectetur, optio quos sint explicabo, fugit
        quisquam deleniti nihil laboriosam. Neque porro magni dicta esse harum
        reprehenderit ut quasi culpa, fuga numquam, perferendis explicabo in
        molestias rem, cupiditate nisi eius ipsum totam ullam quae! Consectetur
        soluta voluptatum expedita. Eveniet dolores neque ea quaerat nulla
        voluptates ab! Aperiam perspiciatis quia, labore voluptate esse
        consequuntur numquam recusandae quasi explicabo voluptatum magnam
        aliquid consectetur deleniti earum itaque vero cum soluta quas, impedit
        iure nemo quam similique! Blanditiis ullam odio quasi laboriosam iste.
        Dolorum neque quod tempora corrupti praesentium temporibus at molestiae!
        Molestiae quidem magni reiciendis tempora consequuntur nesciunt error,
        ipsa deleniti iure consequatur. Maiores, iusto fugit! Nihil aliquam ut
        autem, omnis sit cupiditate sed. Aperiam voluptatem reprehenderit sunt
        distinctio cupiditate, ea laboriosam dignissimos tenetur dicta excepturi
        eum doloribus? Consectetur id, recusandae quae sit dolor odit, deleniti
        fuga ducimus repudiandae eos aperiam sequi, pariatur ab temporibus. Sunt
        dolore sit porro debitis, enim ratione quae delectus quaerat odio ex a
        mollitia eligendi non atque officia, placeat cumque commodi consectetur
        quibusdam, cupiditate similique soluta totam praesentium modi? Sit
        dolorum, voluptates dicta recusandae consectetur odio eligendi saepe
        vel? Nobis culpa quibusdam veniam non ipsum sequi voluptas, laborum
        minus, error, odit quia iure consequuntur! Ratione dolores nobis
        voluptatibus, eaque commodi praesentium sunt, reiciendis veniam
        assumenda voluptate eius, repellat ex at inventore corporis cupiditate
        quas. Vel eum, tenetur iusto placeat fugiat sequi minus commodi cumque
        odit, asperiores animi eos at alias molestiae repellat aperiam atque
        nihil. Enim dolores magni ab iusto illum consequatur, dolore sit
        expedita. Beatae eligendi animi, fugiat repellat modi velit, eveniet a
        totam vel ipsa saepe. Natus eligendi recusandae facere qui corrupti,
        corporis hic quam! Ratione earum fugit, neque magni vel quasi hic non?
        Officia nihil labore nulla voluptate rem tenetur iusto, incidunt unde
        cumque velit porro eius pariatur. Voluptatum asperiores voluptas
        voluptate ad fugit dolor, sit non laudantium! Ratione corporis, iusto
        nam, ipsa atque asperiores quisquam laboriosam debitis a eum accusantium
        eligendi. Dolor, amet ipsam. Distinctio in voluptate dolorum quibusdam,
        eos hic magnam quo enim accusamus ipsa eaque harum dicta iure architecto
        soluta eum, amet, neque sapiente maxime officia. Adipisci assumenda
        culpa doloribus nihil laboriosam enim vel officiis illo velit et quaerat
        minus ullam repellendus sed, autem voluptatum ipsum nisi quam odio
        debitis aut, blanditiis, rem aspernatur itaque. Corrupti nihil assumenda
        facere cupiditate porro maiores deleniti perferendis veritatis
        reiciendis, optio eius qui atque, adipisci quas eveniet beatae est vero.
        Laboriosam ullam nulla commodi voluptates veniam natus laborum nam
        sapiente nihil omnis assumenda possimus maxime consectetur vel,
        architecto recusandae odit modi sunt mollitia velit. Dolorem iure at
        corrupti, impedit magni molestias, quod incidunt pariatur est
        exercitationem quisquam vel rerum modi placeat tempora eius expedita
        nobis aliquam rem omnis fugiat, aliquid dolore? Pariatur rerum animi cum
        ipsum, sit, mollitia dolores consectetur ea consequatur nam, iure
        quaerat quisquam recusandae minima. Unde facere excepturi ea velit
        porro, sint totam autem. Vel unde nulla rem voluptatum magni velit
        suscipit, beatae ex quasi molestias recusandae quae sapiente quidem
        autem consectetur impedit inventore quibusdam soluta tenetur officia
        doloribus! Veritatis ut dignissimos incidunt facilis doloribus, dolorem
        recusandae, similique nisi, facere fugiat omnis sed? Animi nulla dolorum
        quaerat atque omnis iure reprehenderit dolorem sapiente assumenda
        tenetur, eaque in eligendi culpa exercitationem saepe quibusdam? Fuga,
        omnis tenetur odit consectetur repellendus magnam aliquid necessitatibus
        modi quia aut rerum eos quidem voluptatibus harum voluptatem pariatur ab
        velit quam! Deserunt distinctio esse cupiditate nesciunt ratione quidem
        ut, magnam, unde quisquam amet, qui aperiam ullam modi nam officia?
        Quibusdam atque dolor, rem temporibus est repellat harum corrupti.
        Doloribus sequi officia minus tenetur odit reiciendis dolor, ad tempora
        et ullam temporibus fugiat labore optio quos, harum tempore est.
        Repudiandae doloribus saepe omnis placeat delectus ut perspiciatis
        consequatur optio, quibusdam, reiciendis ipsam fugit explicabo, et
        consequuntur pariatur libero suscipit quaerat beatae numquam! Quos animi
        pariatur accusamus amet fuga nesciunt autem maiores est ipsam, quam
        perspiciatis adipisci voluptatibus voluptates accusantium eos rem ipsa
        exercitationem sint quisquam. Fuga, reprehenderit sint! Architecto illum
        sed ipsam, culpa ducimus laborum necessitatibus eum optio, placeat
        aliquam, unde amet eveniet ullam voluptates vel. Molestiae magni
        repudiandae asperiores ipsum, commodi quae expedita! Cum, nihil. Facilis
        quia deserunt ad, eum sunt odit excepturi corrupti assumenda magnam,
        obcaecati amet ducimus doloribus eveniet nam qui. Saepe ducimus quae
        odit ea laboriosam laudantium ut dolorem temporibus blanditiis
        reprehenderit explicabo praesentium facere asperiores fugit corrupti eos
        id magnam, iste natus cum voluptate? Voluptates placeat excepturi veniam
        soluta libero temporibus incidunt, maxime inventore nulla tempore esse
        maiores voluptate illo ab reprehenderit vel itaque minima aliquid!
        Expedita excepturi repellat molestias natus accusantium ipsam dicta
        alias nemo magni. Dolor cupiditate ad mollitia similique porro facere
        commodi, placeat alias excepturi ullam nulla impedit at accusamus labore
        quam ipsam consectetur pariatur? Perferendis nostrum architecto, nulla
        qui distinctio doloremque ad atque quidem hic accusamus repudiandae?
        Reprehenderit magni eum numquam dignissimos nam animi nisi eligendi
        temporibus ducimus facere a cum veritatis, eos quod libero voluptatibus
        nemo exercitationem! Natus molestiae, iste, fugit est debitis doloremque
        fuga illum numquam atque, voluptatibus dolor ab nulla perferendis
        reprehenderit quia soluta. Recusandae nulla ea itaque molestiae?
        Laboriosam illum, dolorem veritatis ducimus est corrupti repellendus,
        fugit quis voluptatum ipsa provident quisquam, blanditiis nihil aliquid
        perspiciatis sequi sunt omnis alias dolore dicta! Vel debitis architecto
        explicabo.
    </>
);

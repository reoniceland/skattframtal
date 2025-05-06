'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import {
  ActionCard,
  Box,
  Breadcrumbs,
  Bullet,
  BulletList,
  Button,
  Link,
  Stack,
  Tag,
  Text,
} from '@reon-island/ui-core'

import InstitutionPanel from '@/components/InstitutionPanel/InstitutionPanel'
import SidebarLayout from '@/components/Layouts/SidebarLayout'
import { RelatedContent } from '@/components/RelatedContent/RelatedContent'
import Sticky from '@/components/Sticky/Sticky'

export function Home() {
  const router = useRouter()

  const category = {
    title: 'Fjármál og Skattar',
    href: 'https://island.is/flokkur/fjarmal-og-skattar',
  }
  const breadcrumbItems = [
    {
      title: 'Ísland.is',
      typename: 'homepage',
      href: 'https://www.island.is',
    },
    {
      title: 'Fjármál og Skattar',
      href: 'https://island.is/flokkur/fjarmal-og-skattar',
    },
    {
      title: 'Skattframtal',
      href: '/skattframtal',
      isCurrentPage: true,
      isTag: true,
    },
  ]
  return (
    <SidebarLayout
      isSticky={false}
      sidebarContent={
        <Sticky>
          <Stack space={3}>
            <Box display={['none', 'none', 'block']} printHidden>
              <Link href={category.href} skipTab>
                <Button
                  preTextIcon="arrowBack"
                  preTextIconType="filled"
                  size="small"
                  type="button"
                  variant="text"
                  truncate
                >
                  {category.title}
                </Button>
              </Link>
            </Box>
            <InstitutionPanel
              institutionTitle="Skatturinn"
              institution="Ríkisskattstjóri"
              img="https://images.ctfassets.net/8k0h54kbe6bj/5y5K2hSSYAk3hzs7ZARe2X/f661c7af2ea66bda32651e3f2986d697/merki-skatturinn.png"
              locale="is"
              imgContainerDisplay={['block', 'block', 'none', 'block']}
            />
            <RelatedContent title={'Tengt efni'} />
          </Stack>
        </Sticky>
      }
    >
      <Box
        paddingBottom={[2, 2, 4]}
        display={['none', 'none', 'block']}
        printHidden
      >
        <Box className="rs_read">
          <Breadcrumbs items={breadcrumbItems} />
        </Box>
      </Box>
      <Box
        paddingBottom={[2, 2, 4]}
        display={['flex', 'flex', 'none']}
        justifyContent="spaceBetween"
        alignItems="center"
        printHidden
      >
        <Box flexGrow={1} marginRight={6} overflow={'hidden'}>
          <Link href={category.href} skipTab>
            <Button
              preTextIcon="arrowBack"
              preTextIconType="filled"
              size="small"
              type="button"
              variant="text"
              truncate
            >
              {category.title}
            </Button>
          </Link>
        </Box>
        <Box minWidth={0}>
          <Link href="" skipTab>
            <Tag variant="purple" truncate>
              Skatturinn
            </Tag>
          </Link>
        </Box>
      </Box>
      <Box>
        <Text variant="h1" as="h1" paddingBottom={[2, 2, 4]}>
          <span id="skattframtal" className="rs_read">
            Skattframtal
          </span>
        </Text>
        <Text>
          Skattframtal er árleg skýrsla þín til Skattsins þar sem þú staðfestir
          tekjur, eignir, skuldir og frádrátt fyrir tekjuárið sem var að líða.
          Skattframtalið byggir á for­uppfylltum gögnum frá atvinnurekendum,
          bönkum, lífeyrissjóðum o.fl., en þú berð ábyrgð á að yfirfara,
          leiðrétta og staðfesta upplýsingarnar.
        </Text>
        <Box paddingTop={[2, 2, 4]}>
          <ActionCard
            heading="Skil á skattframtali"
            backgroundColor="blue"
            cta={{
              label: 'Opna',
              onClick: () => {
                router.push('/skattframtal')
              },
            }}
          ></ActionCard>
        </Box>
        <Text
          variant="h3"
          as="h2"
          marginTop={[4, 4, 6]}
          marginBottom={[1, 2, 3]}
        >
          Hverjir þurfa að skila framtali?
        </Text>
        <BulletList type="ul">
          <Bullet>
            Allir einstaklingar sem búa eða dvelja skatt­skyldir á Íslandi hluta
            árs eða allt árið.
          </Bullet>
          <Bullet>
            Hjón og sambúðarfólk skila saman, nema óskað hafi verið eftir
            aðskilnaði skattframtala.
          </Bullet>
          <Bullet>
            Erlendir starfsmenn sem unnu hér á landi lengur en 183 daga á
            tekjuárinu.
          </Bullet>
          <Bullet>
            Lág­tekju­nemar og atvinnulausir: Þótt engar tekjur séu, þarf samt
            að staðfesta foruppfyllt framtal.
          </Bullet>
        </BulletList>
        <Text
          variant="h3"
          as="h2"
          marginTop={[4, 4, 6]}
          marginBottom={[1, 2, 3]}
        >
          Mikilvægar dagsetningar (tekjuár 2024 / framtal 2025)
        </Text>
        <BulletList type="ul">
          <Bullet>
            <strong>15. febrúar 2025:</strong> Rafrænt framtal opnar í
            þjónustugátt Skattsins
          </Bullet>
          <Bullet>
            <strong>10. mars 2025:</strong> Síðasti dagur til að óska eftir
            aðskilnaði hjóna
          </Bullet>
          <Bullet>
            <strong>18. mars 2025:</strong> Frestur fyrir lögaðila (fyrirtæki)
          </Bullet>
          <Bullet>
            <strong>25. mars 2025:</strong> Almennur skilafrestur einstaklinga*
            (hægt er að sækja um 15 daga framlengingu áður)
          </Bullet>
          <Bullet>
            <strong>15. apríl 2025:</strong> Útsvar og tekjuskatts­reikningur
            birtist (áætlað)
          </Bullet>
        </BulletList>

        {/* HVAÐ ÞARF AÐ HAFA VIÐ HÖNDINA */}
        <Text
          variant="h3"
          as="h2"
          marginTop={[4, 4, 6]}
          marginBottom={[1, 2, 3]}
        >
          Hvað þarf ég að hafa við höndina?
        </Text>
        <BulletList type="ul">
          <Bullet>Rafræn skilríki (síma- eða auðkennis­app)</Bullet>
          <Bullet>Launaseðla ársins ef tekjur vantar eða eru rangar</Bullet>
          <Bullet>
            Kvittanir vegna frádráttar (t.d. stéttarfélagsgjöld, gjafafé til
            góðgerðarmála, náms- og ferðakostnaður)
          </Bullet>
          <Bullet>
            Staðfestingu á fjárfestingum (hlutabréf, crypto, húsnæði erlendis)
          </Bullet>
          <Bullet>Viðbótarlífeyrissamninga og yfirlit bankareikninga</Bullet>
        </BulletList>

        {/* SKREF-FYRIR-SKREF */}
        <Text
          variant="h3"
          as="h2"
          marginTop={[4, 4, 6]}
          marginBottom={[1, 2, 3]}
        >
          Skref fyrir skref — svona skilar þú framtali
        </Text>
        <BulletList type="ul">
          <Bullet>
            Skráðu þig inn á island.is → „Þínar síður” → „Skattframtal“
          </Bullet>
          <Bullet>
            Rifjaðu upp yfirlit: Tekjur, eignir, skuldir og fyrirfram skráður
            frádráttur
          </Bullet>
          <Bullet>
            Leiðréttu það sem vantar eða er rangt með „Bæta við“ eða „Breyta“
          </Bullet>
          <Bullet>Staðfestu og undirritaðu rafrænt</Bullet>
          <Bullet>Vistaðu kvittun; hún birtist í innhólfi þínu</Bullet>
        </BulletList>

        {/* LEIÐRÉTTINGAR & FRESTIR */}
        <Text
          variant="h3"
          as="h2"
          marginTop={[4, 4, 6]}
          marginBottom={[1, 2, 3]}
        >
          Leiðréttingar, endurákvarðanir og frestbeiðnir
        </Text>
        <BulletList type="ul">
          <Bullet>
            Leiðrétting eftir skil: Sendu rafræna „beiðni um breytingu“ þar til
            álagning liggur fyrir (júní/júlí)
          </Bullet>
          <Bullet>
            Endurákvörðun: Óska má endurákvörðunar innan 6 ára ef villa finnst
            eftir álagningu
          </Bullet>
          <Bullet>
            Frestur: Sérstakar aðstæður? Sæktu um framlengingu með stuttri
            rök­greiningu í gáttinni
          </Bullet>
        </BulletList>

        {/* ALGENGAR SPURNINGAR */}
        <Text
          variant="h3"
          as="h2"
          marginTop={[4, 4, 6]}
          marginBottom={[1, 2, 3]}
        >
          Algengar spurningar
        </Text>
        <BulletList type="ul">
          <Bullet>
            Þarf ég að telja fram leigutekjur Airbnb? – Já, allar leigutekjur
            yfir 2 millj. kr. eru skattskyldar; skráðu í lið 4.4.
          </Bullet>
          <Bullet>
            Hvað með rafmynt? – Sala eða skipti á crypto eru skattskyld; skráðu
            söluhagnað/-tap í lið 3.21.
          </Bullet>
          <Bullet>
            Fæ ég sjálfvirkan frádrátt fyrir námslán? – Nei, þú skráir greiddar
            afborganir sjálf/ur í lið 8.3.
          </Bullet>
          <Bullet>
            Hvernig fæ ég staðfestingu? – Framtalskvittun fer í pósthólfið, auk
            þess sem þú getur sótt PDF á „Mín framtöl“.
          </Bullet>
        </BulletList>

        {/* ÞJÓNUSTA */}
        <Text
          variant="h3"
          as="h2"
          marginTop={[4, 4, 6]}
          marginBottom={[1, 2, 3]}
        >
          Þjónusta og frekari upplýsingar
        </Text>
        <BulletList type="ul">
          <Bullet>
            Spjallbotn Skattsins (vinstri neðst á síðunni) er opinn 24/7
          </Bullet>
          <Bullet>Sími þjónustuverks: 442 1000 (mán.–föst. kl. 9–15)</Bullet>
          <Bullet>Skattar.is/framtal — ítarleg lög og reglugerðir</Bullet>
          <Bullet>
            Ráðgjöf: Endurskoðendur og bókarar geta aðstoðað við flóknari
            tilfelli
          </Bullet>
        </BulletList>

        {/* ATHUGASEMD */}
        <Text variant="small" marginTop={[4, 4, 6]}>
          Athugið: Reglur og dagsetningar geta breyst. Skoðið alltaf nýjustu
          tilkynningar á island.is og Skatturinn.is áður en þú skilar.
        </Text>
      </Box>
    </SidebarLayout>
  )
}

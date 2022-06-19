import JSONPretty from 'react-json-pretty'
import PublicationItem from './PublicationItem'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    VStack
} from '@chakra-ui/react'

const AccordionFirst = ({ publication }) => {
    return (
        <Accordion allowToggle>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex='1' textAlign='left'>
                            JSON full answer
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <JSONPretty id="json-pretty" data={publication} />
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

const PublicationList = ({ publications }) => {
    return (
        <div>
            <AccordionFirst publication={publications[0]} />
            <VStack>
                {
                    publications.map((publication) => (
                        <PublicationItem
                            key={publication.id}
                            publication={publication}
                        />
                    ))
                }
            </VStack>
        </div>
    )
}

export default PublicationList
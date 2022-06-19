import JSONPretty from 'react-json-pretty'
import ProfileItem from './ProfileItem'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    VStack
} from '@chakra-ui/react'

const ProfileList = ({ profiles }) => {
    return (
        <div>
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
                        <JSONPretty id="json-pretty" data={profiles[0]} />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <VStack>
                {
                    profiles.map((profile) => (
                        <ProfileItem
                            key={profile.id}
                            profile={profile}
                        />
                    ))
                }
            </VStack>
        </div>
    )
}

export default ProfileList
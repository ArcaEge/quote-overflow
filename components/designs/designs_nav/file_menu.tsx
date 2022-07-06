import { Menu, Button, TextInput, Divider, Group } from '@mantine/core'

export default function FileMenu({ design }) {
    return (
        <Menu control={<Button variant="subtle" color="gray" ml={0}>File</Button>} size="md">
            <TextInput placeholder="Design name" variant="unstyled" mx="xs" />
            <Divider />
        </Menu>
    )
}
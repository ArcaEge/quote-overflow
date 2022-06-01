import { TextInput, Tooltip, Button } from "@mantine/core"
import { useForm } from '@mantine/form'
import { InfoCircle } from "tabler-icons-react"

export default function NewDesignModal({ onClose }) {
    const form = useForm({
        initialValues: {
            designName: '',
        },

        validate: {
            designName: (value) => (value.length >= 3 ? null : 'Invalid name (needs to be at least 3 characters)'),
        },
    })

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput required {...form.getInputProps('designName')} label={
                <>
                    Design Name <Tooltip label="This can be changed later">
                        <InfoCircle size={14} style={{ paddingBottom: 0 }} />
                    </Tooltip>
                </>
            } placeholder="Design Name" data-autofocus />

            <Button fullWidth variant="gradient" mt="md" type="submit">
                Create
            </Button>
        </form>
    )
}
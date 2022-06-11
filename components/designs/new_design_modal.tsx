import { TextInput, Tooltip, Button, Textarea } from "@mantine/core"
import { useForm } from '@mantine/form'
import { InfoCircle } from "tabler-icons-react"

export default function NewDesignModal({ onClose }) {
    const form = useForm({
        initialValues: {
            designName: '',
            description: '',
        },

        validate: {
            designName: (value) => (value.length >= 3 ? null : 'Invalid design name (needs to be 3 at least characters)'),
        },
    })

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput {...form.getInputProps('designName')} label={
                <>
                    Design Name <Tooltip label="Can be changed later">
                        <InfoCircle size={14} style={{ paddingBottom: 0 }} />
                    </Tooltip>
                </>
            } placeholder="Design Name" data-autofocus maxLength={60} />

            <Textarea {...form.getInputProps('description')} label={
                <>
                    Description <Tooltip label="Can be changed later">
                        <InfoCircle size={14} style={{ paddingBottom: 0 }} />
                    </Tooltip>
                </>
            } placeholder="Description" description="Max 1500 characters" mt="xs" autosize minRows={2} maxRows={20} maxLength={1500} />

            <Button fullWidth variant="gradient" mt="md" type="submit">
                Create
            </Button>
        </form>
    )
}
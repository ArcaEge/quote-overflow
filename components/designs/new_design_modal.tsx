import { TextInput, Tooltip, Button, Textarea } from "@mantine/core"
import { useForm } from '@mantine/form'
import { InfoCircle } from "tabler-icons-react"
import { getCsrfToken } from "next-auth/react"
import { useRouter } from "next/router"
import { LoadingOverlay } from '@mantine/core';
import { useState } from "react"

export default function NewDesignModal({ onClose }) {
    const router = useRouter()
    const [ showLoader, setShowLoader ] = useState(false)
    const form = useForm({
        initialValues: {
            designName: '',
            description: '',
        },

        validate: {
            // Name needs to be at least 3 characters
            designName: (value) => (value.length >= 3 ? null : 'Invalid design name (needs to be 3 at least characters)'),
        },
    })

    const submit = async (values) => {
        const csrfToken = await getCsrfToken()
        setShowLoader(true)
        fetch('/api/designs/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
            body: JSON.stringify(values),
        }).then(res => {
            setShowLoader(false)
            if (res.status === 200) {
                router.push("/dashboard")
                onClose()
            }
        })
    }

    return (
        <>
            <LoadingOverlay visible={showLoader} loaderProps={{ size: 'md', variant: 'bars' }} />
            <form onSubmit={form.onSubmit((values) => submit(values))}>
                <TextInput required {...form.getInputProps('designName')} label={
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
        </>
    )
}
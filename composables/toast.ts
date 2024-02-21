export async function toastGood(message: string, status: number) {
    const toast = useToast()
    toast.add({
        id: "toast-message",
        title: message,
        icon: 'i-heroicons-check-circle',
        timeout: 3000,
    })
}
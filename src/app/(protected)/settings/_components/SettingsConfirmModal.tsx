import { Modal } from '@/components/Modal'

interface SettingsConfirmModalProps {
    caption: string
    confirmLabel: string
    confirmVariant?: 'primary' | 'error'
    isOpen: boolean
    isPending?: boolean
    onClose: () => void
    onConfirm: () => void
    pendingLabel?: string
    title: string
}

export default function SettingsConfirmModal({
    caption,
    confirmLabel,
    confirmVariant = 'primary',
    isOpen,
    isPending = false,
    onClose,
    onConfirm,
    pendingLabel,
    title,
}: SettingsConfirmModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={isPending ? () => undefined : onClose}>
            <Modal.Header title={title} caption={caption} />
            <Modal.Footer>
                <Modal.Button variant="outline" disabled={isPending} onClick={onClose}>
                    취소
                </Modal.Button>
                <Modal.Button
                    variant={confirmVariant}
                    disabled={isPending}
                    onClick={onConfirm}
                >
                    {isPending && pendingLabel ? pendingLabel : confirmLabel}
                </Modal.Button>
            </Modal.Footer>
        </Modal>
    )
}

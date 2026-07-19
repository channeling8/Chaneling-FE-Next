'use client'

import { type MouseEvent, useRef, useState, useEffect } from 'react'
import TextField, { type TextFieldProps } from '@/components/TextField'

interface EditableTextFieldProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
    initialValue?: string
    onSave?: (value: string) => void | Promise<void>
}

export default function EditableTextField({
    initialValue = '',
    inputClassName = '',
    onFocus,
    onSave,
    ...props
}: EditableTextFieldProps) {
    const fieldRef = useRef<HTMLDivElement>(null)
    const [savedValue, setSavedValue] = useState(initialValue)
    const [draftValue, setDraftValue] = useState(initialValue)
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        setSavedValue(initialValue)
        setDraftValue(initialValue)
    }, [initialValue])

    function closeEditor() {
        const activeElement = document.activeElement

        if (activeElement instanceof HTMLElement && fieldRef.current?.contains(activeElement)) {
            activeElement.blur()
        }

        setIsEditing(false)
    }

    function handleCancel(event: MouseEvent<HTMLButtonElement>) {
        event.currentTarget.blur()
        setDraftValue(savedValue)
        closeEditor()
    }

    async function handleSave(event: MouseEvent<HTMLButtonElement>) {
        event.currentTarget.blur()
        setIsSaving(true)

        try {
            await onSave?.(draftValue)
            setSavedValue(draftValue)
            closeEditor()
        } catch {
            setDraftValue(savedValue)
            closeEditor()
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div ref={fieldRef} className="group/editable flex w-full flex-col items-end gap-2">
            <TextField
                {...props}
                isActive={isEditing}
                value={draftValue}
                onChange={setDraftValue}
                onFocus={(event) => {
                    setIsEditing(true)
                    onFocus?.(event)
                }}
                inputClassName={inputClassName}
            />

            <div className={`${isEditing ? 'flex' : 'hidden'} gap-1 pb-2 group-focus-within/editable:flex`}>
                <button
                    type="button"
                    disabled={isSaving}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={handleCancel}
                    className="rounded-[20px] bg-bg-1 px-3 py-1.5 font-caption-12m text-text-primary transition-colors hover:bg-bg-2"
                >
                    취소
                </button>
                <button
                    type="button"
                    disabled={isSaving}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={handleSave}
                    className="rounded-[20px] bg-primary-60 px-3 py-1.5 font-caption-12m text-text-primary transition-colors hover:bg-primary-70"
                >
                    {isSaving ? '저장 중' : '저장'}
                </button>
            </div>
        </div>
    )
}

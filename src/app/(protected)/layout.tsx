import { noIndexMetadata } from '@/config/metadata'
import ProtectedShell from './_components/ProtectedShell'

export const metadata = noIndexMetadata

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return <ProtectedShell>{children}</ProtectedShell>
}

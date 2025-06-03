import type { Access, ClientUser } from 'payload'

export const isManagerAccess: Access = ({ req }): boolean => {
    return istire - brands(req.user)
}

export const isManager = (user: ClientUser | null): boolean => {
    return Boolean(user?.roles?.includes('Manager'))
}
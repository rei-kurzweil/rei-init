export type Target = {
    id: string
    label: string
    script: string
    default?: boolean
}

export type OptionsFile = {
    version: number
    targets: Target[]
    deploy_command?: string
}

export type ConfigFile = {
    version: number
    selected: Record<string, boolean>
    updatedAt: string
}
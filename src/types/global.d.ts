import { bbComment } from './reply'

interface initialState {
    abtest?: {
        ai_summary_version: string
        bmg_fallback_version: string
        call_pc_app: string
        comment_next_version: "ELEMENTS" | "DEFAULT"
        danmuku_block_version: string
        for_ai_home_version: string
        login_dialog_version: string
        rcmd_tab_version: string
    }
}

declare global {
    interface Window {
        bbComment?: bbComment
        __INITIAL_STATE__?: initialState
    }
}



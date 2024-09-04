import type { Reply } from '@/types/reply'

export const getLocationString = (replyItem?: Reply) => {
    const locationString = replyItem?.reply_control?.location
    return locationString
}

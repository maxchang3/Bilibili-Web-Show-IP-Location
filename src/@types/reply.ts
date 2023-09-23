interface Content {
    message: string
    members: any[]
    jump_url: JumpURL
    max_line: number
}

interface JumpURL {
}

interface Folder {
    has_folded: boolean
    is_folded: boolean
    rule: string
}

interface Member {
    mid: string
    uname: string
    sex: string
    sign: string
    avatar: string
    rank: string
    face_nft_new: number
    is_senior_member: number
    senior: JumpURL
    level_info: LevelInfo
    pendant: Pendant
    nameplate: Nameplate
    official_verify: OfficialVerify
    vip: Vip
    fans_detail: null
    user_sailing: UserSailing
    is_contractor: boolean
    contract_desc: string
    nft_interaction: null
    avatar_item: AvatarItem
}

interface AvatarItem {
    container_size: ContainerSize
    fallback_layers: FallbackLayers
    mid: string
}

interface ContainerSize {
    width: number
    height: number
}

interface FallbackLayers {
    layers: Layer[]
    is_critical_group: boolean
}

interface Layer {
    visible: boolean
    general_spec: GeneralSpec
    layer_config: LayerConfig
    resource: Resource
}

interface GeneralSpec {
    pos_spec: PosSpec
    size_spec: ContainerSize
    render_spec: RenderSpec
}

interface PosSpec {
    coordinate_pos: number
    axis_x: number
    axis_y: number
}

interface RenderSpec {
    opacity: number
}

interface LayerConfig {
    tags: Tags
    is_critical: boolean
    layer_mask: LayerMask
}

interface LayerMask {
    general_spec: GeneralSpec
    mask_src: MaskSrc
}

interface MaskSrc {
    src_type: number
    draw: Draw
}

interface Draw {
    draw_type: number
    fill_mode: number
    color_config: ColorConfig
}

interface ColorConfig {
    day: Day
}

interface Day {
    argb: string
}

interface Tags {
    AVATAR_LAYER: JumpURL
}

interface Resource {
    res_type: number
    res_image: ResImage
}

interface ResImage {
    image_src: ImageSrc
}

interface ImageSrc {
    src_type: number
    placeholder: number
    remote: Remote
}

interface Remote {
    url: string
    bfs_style: string
}

interface LevelInfo {
    current_level: number
    current_min: number
    current_exp: number
    next_exp: number
}

interface Nameplate {
    nid: number
    name: string
    image: string
    image_small: string
    level: string
    condition: string
}

interface OfficialVerify {
    type: number
    desc: string
}

interface Pendant {
    pid: number
    name: string
    image: string
    expire: number
    image_enhance: string
    image_enhance_frame: string
}

interface UserSailing {
    pendant: null
    cardbg: null
    cardbg_with_focus: null
}

interface Vip {
    vipType: number
    vipDueDate: number
    dueRemark: string
    accessStatus: number
    vipStatus: number
    vipStatusWarn: string
    themeType: number
    label: Label
    avatar_subscript: number
    nickname_color: string
}

interface Label {
    path: string
    text: string
    label_theme: string
    text_color: string
    bg_style: number
    bg_color: string
    border_color: string
    use_img_label: boolean
    img_label_uri_hans: string
    img_label_uri_hant: string
    img_label_uri_hans_static: string
    img_label_uri_hant_static: string
}

interface ReplyControl {
    is_up_top: boolean
    max_line: number
    sub_reply_entry_text: string
    sub_reply_title_text: string
    time_desc: string
    location?: string
    up_reply: boolean
}

interface UpAction {
    like: boolean
    reply: boolean
}

export interface Reply {
    rpid: number
    oid: number
    type: number
    mid: number
    root: number
    parent: number
    dialog: number
    count: number
    rcount: number
    state: number
    fansgrade: number
    attr: number
    ctime: number
    rpid_str: string
    root_str: string
    parent_str: string
    like: number
    action: number
    member: Member
    content: Content
    replies: Reply[] | null
    assist: number
    up_action: UpAction
    invisible: boolean
    reply_control: ReplyControl
    folder: Folder
    dynamic_id_str: string
}

export interface ReplyElement extends HTMLDivElement {
    __vnode: {
        ctx: {
            props: {
                reply: Reply
            }
        }
    }
}

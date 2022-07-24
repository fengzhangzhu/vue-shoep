import Vue from 'vue'
//Message 导入弹框提示组件
import {
    Button,
    Form,
    FormItem,
    Input,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu, //菜单
    Submenu,
    MenuItem,
    Breadcrumb, //面包屑
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Tooltip, //浮动提示框
    Pagination,
    Dialog, //对话框
    MessageBox,
    Tag,
    Tree,
    Select,
    Option,
    Cascader,
} from 'element-ui'

//全局注册使用组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
    //全局挂载Message
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
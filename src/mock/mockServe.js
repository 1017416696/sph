import Mock from 'mockjs'
import banner from './banner.json'
import floor from "./floor.json";
import address from './address.json'

//mock 方法第一个参数是请求的地址，第二个参数是请求的数据

Mock.mock("/mock/banner",{
    code:200,
    data:banner
})

Mock.mock("/mock/floor",{
    code:200,
    data:floor
})

Mock.mock('/mock/userAddress',{
    code:200,
    data:address
})

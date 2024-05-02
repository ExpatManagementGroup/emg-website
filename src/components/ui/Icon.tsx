import Workers from '../icons/Workers'
import Relocation from '../icons/Relocation'
import Immigration from '../icons/Immigration'
import Checkmark from '../icons/Checkmark'
import Certified from '../icons/Certified'
import Phone from '../icons/Phone'
import Email from '../icons/Email'
import Global from '../icons/Global'

export default function Icon( props: any){
  switch (props.name) {
    case "workers":
      return(
        <Workers />
      )
    case "relocation":
      return (
        <Relocation />
      )
    case "immigration":
      return (
        <Immigration />
      )
    case "checkmark":
      return (
        <Checkmark />  
      )
    case "checkmark-orange":
      return (
        <Checkmark variant="orange" />
      )
    case "certified":
      return (
        <Certified />
      )
    case "phone":
      return (
        <Phone />  
      )
    case "email":
      return (
        <Email />
      )
    case "global":
      return (
        <Global />
      )
  }
}
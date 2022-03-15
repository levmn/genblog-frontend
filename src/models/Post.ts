import Theme from './Theme';
import User from "./User";

interface Post{
    id: number
    titulo: string
    texto: string
    tema?: Theme | null;
    usuario: User | null 
}

export default Post;
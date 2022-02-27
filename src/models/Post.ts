import Theme from './Theme';

interface Post{
    id: number;
    titulo: string;
    texto: string;
    tema?: Theme | null;
}

export default Post;
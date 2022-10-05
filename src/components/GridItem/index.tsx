import { GridItemType } from '../../types/gridItemType';
import * as C from './styles';
import ecc from '../../image/ECC.png';
import { items } from '../../data/items';

type Props = {
    item: GridItemType,
    onClick: () => void
}

export const GridItem = ({item, onClick}: Props) => {
    return (
        <C.Container 
            showBackground={item.permanentShow || item.shown}
            onClick={onClick}
        >
            {!item.permanentShow && !item.shown &&
                <C.Icon src={ecc} alt="" opacity={.1}/>
            }
            {(item.permanentShow || item.shown) && item.item !== null &&
                <C.Icon src={items[item.item].icon} alt="" />
            }
        </C.Container>
    );
}
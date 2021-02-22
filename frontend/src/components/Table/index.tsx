import * as S from './styles'

export type ColumnProps = {
    title: string
}

export type BodyProps = {
    id: number
    content: Array<string | JSX.Element>
}

export type TableProps = {
    columns: ColumnProps[]
    body: BodyProps[]
}

const Table = ({ columns, body }: TableProps) => (
    <S.Wrapper>
        <S.TableHeader>
            <S.TableRow columns={columns.length}>
                {columns.map(({ title }, index) => (
                    <S.TableHeaderData key={title + index}>
                        {title}
                    </S.TableHeaderData>
                ))}
            </S.TableRow>
        </S.TableHeader>
        <S.TableBody>
            {body.map(({ id, content }) => (
                <S.TableRow key={id} columns={columns.length}>
                    {content.map((item, index) => (
                        <S.TableData key={id + index}>{item}</S.TableData>
                    ))}
                </S.TableRow>
            ))}
        </S.TableBody>
    </S.Wrapper>
)

export default Table

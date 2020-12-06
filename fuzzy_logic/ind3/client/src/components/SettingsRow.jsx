import styled from 'styled-components'

function IconWrapper({ icon, callback }) {
    if (icon !== null) {
        return <Icon src={icon} onClick={callback} />
    }
    return null
}

export default function SettingsRow({ title, text, icon1=null, icon2=null, callback1=null, callback2=null }) {
    return (
        <Wrapper>
            <Wrapper>
                <Text>{ title }:</Text>
                <Text>{ text }</Text>
            </Wrapper>
            <Wrapper>
                <IconWrapper icon={icon1} callback={callback1} />
                <IconWrapper icon={icon2} callback={callback2} />
                {/* <Icon src={previousIcon} onClick={prevMatrix} />
                <Icon src={nextIcon} onClick={nextMatrix} /> */}
            </Wrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Text = styled.p`
    margin: 0 10px 0 0;
    font-size: 15px;
`

const Icon = styled.img`
    width: 16px;
    height: 16px;
    cursor: pointer;
`
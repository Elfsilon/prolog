import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Matrix, EigenvalueDecomposition } from 'ml-matrix';
import { std as mathStd, mean as mathMean } from 'mathjs'
import styled from 'styled-components'

import { ESSettings, ESBlock, IElement, Modal } from '../components'
import backIcon from '../assets/back.svg'

const startObjects = [
    {
        id: 0,
        name: 'Template Object'
    },
]

const startTerms = [
    {
        id: 0,
        name: 'Template Term'
    },
]

const startFactors = [
    {
        id: 0,
        name: 'Template Factor',
        ratio: 1
    },
]

const startExperts = [
    {
        id: 0,
        name: 'Template Expert',
        ratio: 1,
        matrix: [
            [
             [1, 1, 1],
             [1, 1, 1],
             [1, 1, 1]
            ],
        ]
    }
]

export default function ExpertSystem({ location }) {
    const [objects, setObjects] = useState(startObjects)
    const [terms, setTerms] = useState(startTerms)
    const [factors, setFactors] = useState(startFactors)
    const [experts, setExperts] = useState(startExperts)

    const [selected, setSelected] = useState(null)
    const [selectedType, setSelectedType] = useState('')

    const [modalComponent, setModalComponent] = useState(null)
    const [modalMessage, setModalMessage] = useState('Message')
    const [modalActive, setModalActive] = useState(false)

    useEffect(() => {
        const data = location.state.data
        setExperts(data.experts)
        setTerms(data.terms)
        setFactors(data.factors)
        setObjects(data.objects)
    }, [])

    function insertEmpty(type) {
        let obj;
        let setter;
        let emptyObject = {}

        switch (type) {
        case 'object': 
            obj = objects
            setter = setObjects
            break;
        case 'factor': 
            obj = factors
            setter = setFactors
            break;
        case 'term': 
            obj = terms
            setter = setTerms
            break;
        case 'expert': 
            obj = experts
            setter = setExperts
            break;
        }

        const arr = [
            ...obj,
            {
                id: obj.length,
                name: 'Empty Object'
            },
        ]

        setter([
            ...obj,
            {
                id: obj.length,
                name: 'Empty Object'
            },
        ])
    }

    function insertEmptyObject() {
        const eObj = {
            id: objects.length,
            name: 'Empty Object'
        }
        setObjects([ ...objects, eObj ])
    }

    function insertEmptyTerm() {
        const eTerm = {
            id: terms.length,
            name: 'Empty Term'
        }
        setTerms([ ...terms, eTerm ])
    }

    function insertEmptyFactor() {
        const eFact = {
            id: factors.length,
            name: 'Empty Factor',
            ratio: 1
        }
        setFactors([ ...factors, eFact ])
    }

    function insertEmptyExpert() {
        const eExp = {
            id: experts.length,
            name: 'Empty Expert',
            ratio: 1,
            matrix: []
        }

        for (let f = 0; f < factors.length; f++) {
            const mat = []
            for (let i = 0; i < objects.length; i++) {
                const row = []
                for (let j = 0; j < objects.length; j++) {
                    row.push(1)
                }
                mat.push(row)
            }
            eExp.matrix.push(mat)
        }

        setExperts([ ...experts, eExp ])
    }

    function onObjectClick(id) {
        const found = objects.find((e) => e.id == id)
        setSelected(found)
        setSelectedType('object')
    }

    function onTermClick(id) {
        const found = terms.find((e) => e.id == id)
        setSelected(found)
        setSelectedType('term')
    }

    function onExpertClick(id) {
        const found = experts.find((e) => e.id == id)
        setSelected(found)
        setSelectedType('expert')
    }

    function onFactorClick(id) {
        const found = factors.find((e) => e.id == id)
        setSelected(found)
        setSelectedType('factor')
    }

    function onChangeMatrix(i, j, value, factorID, expertID) {
        const newExpert = experts.find(e => e.id == expertID)
        newExpert.matrix[factorID][i][j] = +value
        newExpert.matrix[factorID][j][i] = +value == 0 ? 1/0.000001 : 1 / +value

        const newExperts = []
        experts.forEach(e => {
            if (e.id == expertID) {
                newExperts.push(newExpert)
            } else {
                newExperts.push(e)
            }
        })

        setExperts(newExperts)
    }

    function onChangeName(type, objectID, name) {
        const [typeObject, typeObjectSetter] = pickType(type)
        const newObject = typeObject.find(o => o.id === objectID)
        newObject.name = name

        const newObjects = []
        typeObject.forEach(o => {
            if (o.id == objectID) {
                newObjects.push(newObject)
            } else {
                newObjects.push(o)
            }
        })

        typeObjectSetter(newObjects)
    }

    function onChangeRatio(type, objectID, ratio) {
        const [typeObject, typeObjectSetter] = pickType(type)
        const newObject = typeObject.find(o => o.id === objectID)
        newObject.ratio = ratio

        const newObjects = []
        typeObject.forEach(o => {
            if (o.id == objectID) {
                newObjects.push(newObject)
            } else {
                newObjects.push(o)
            }
        })

        typeObjectSetter(newObjects)
    }

    function pickType(type) {
        switch (type) {
            case 'expert': 
                return [experts, setExperts]
            case 'term': 
                return [terms, setTerms]
            case 'factor': 
                return [factors, setFactors]
            case 'object': 
                return [objects, setObjects]
        }
        return null
    }

    // Analisys

    function eigen(mat) {
        const m = new Matrix(mat)
        const e = new EigenvalueDecomposition(m)

        const real = e.realEigenvalues

        const vectors = []
        for (const row of e.eigenvectorMatrix.data) {
            const vec = []
            for (const el of row) {
                vec.push(el)
            }
            vectors.push(vec)
        }

        return [real, vectors, Math.max(...real)]
    }

    function consistencyCheck(lambda, n) {
        return (lambda - n) / (n - 1) < 0.3
    }

    function consistencyCheckAll() {
        for (const exp of experts) {
            for (let i = 0; i < factors.length; i++) {
                const [eigenValues, eigenVectors, maxEigenValue] = eigen(exp.matrix[i])
                const check = consistencyCheck(maxEigenValue, objects.length * objects.length)
                if (!check) return [false, {
                    name: exp.name,
                    factor: factors[i]
                }]
            }
        }
        return [true, null]
    }

    function geomMean() {
        const expertsInfo = []
        for (const exp of experts) {
            const expInfo = {
                id: exp.id,
                ratio: exp.ratio,
                means: [],
            }
            for (let i = 0; i < factors.length; i++) {
                const meansRow = []
                for (const row of exp.matrix[i]) {
                    let mul = 1
                    for (const el of row) {
                        mul *= el
                    }
                    meansRow.push(Math.sqrt(mul))
                }
                expInfo.means.push(meansRow)
            }
            expertsInfo.push(expInfo)
        }
        return expertsInfo
    }

    function computeMeans(expertMeans) {
        const means = []
        for (let i = 0; i < factors.length; i++) {
            const factMeans = []
            for (let j = 0; j < objects.length; j++) {
                let mean = 0
                for (const exp of expertMeans) {
                    mean += exp.ratio * exp.means[i][j]
                }
                factMeans.push(mean / expertMeans.length)
            }

            let max = -100000
            for (let m of factMeans) {
                if (m > max) max = m
            }
            means.push(factMeans.map(m => m / max))
        }

        return means
    }

    function coefVariation(lst) {
        const std = mathStd(lst)
        const mean = mathMean(lst)
        return std / mean <= 0.25
    }

    function consistencyExpertsCheck(expertMeans) {
        for (let i = 0; i < factors.length; i++) {
            for (let j = 0; j < objects.length; j++) {
                const listToCheck = []
                for (const exp of expertMeans) {
                    listToCheck.push(exp.means[i][j])
                }
                console.log('check ', j);
                const check = coefVariation(listToCheck)
                if (!check) return false
            }
        }
        return true
    }

    function compute() {   
        const [status, expertFailed] = consistencyCheckAll()     

        if (status) {
            let info = geomMean()
            const expStatus = consistencyExpertsCheck(info)

            let infoCut
            let expStatusCut
            if (info.length > 1) {
                infoCut = info.slice(0, info.length - 1)
                expStatusCut = consistencyExpertsCheck(infoCut)
            }

            if (!expStatus && !expStatusCut) {
                setModalMessage('Check failed')
                setModalActive(true)
            } else {
                if (!expStatus && expStatusCut) info = infoCut
                const means = computeMeans(info)
                let message = ''
                for (let i = 0; i < means.length; i++) {
                    message += `Factor "${factors[i].name}":\n`
                    for (let j = 0; j < means[0].length; j++) {
                        message += `  ${objects[j].name}: ${means[i][j].toFixed(3)}\n`
                    }
                    message += '\n'
                }
        
                setModalMessage(message)
                setModalActive(true)
            }            
        } else {
            setModalMessage(`Expert ${expertFailed.name} faild factor ${expertFailed.factor}`)
            setModalActive(true)
        }
    }

    return (
        <Container>
            {
                modalActive ? (
                    <Modal message={modalMessage} onClose={() => setModalActive(false)} />
                ) : null
            }
            <Wrapper>
                <Link to="/">
                    <Icon src={backIcon} alt='back' />
                </Link>
                <Title>Expert system IDEs</Title>
            </Wrapper>
            <Content>
                <ContentWrapper width='60%'>
                    <ContentGridItem>
                        <ESBlock 
                            title='Objects' 
                            data={objects} 
                            onInsert={insertEmptyObject} 
                            onItemClick={onObjectClick} 
                        />
                    </ContentGridItem>
                    <ContentGridItem>
                        <ESBlock 
                            title='Terms' 
                            data={terms} 
                            onInsert={insertEmptyTerm} 
                            onItemClick={onTermClick} 
                        />
                    </ContentGridItem>
                    <ContentGridItem>
                        <ESBlock 
                            title='Factors' 
                            data={factors} 
                            onInsert={insertEmptyFactor} 
                            onItemClick={onFactorClick} 
                        />
                    </ContentGridItem>
                    <ContentGridItem>
                        <ESBlock 
                            title='Experts' 
                            data={experts} 
                            onInsert={insertEmptyExpert} 
                            onItemClick={onExpertClick} 
                        />
                    </ContentGridItem>
                </ContentWrapper>
                <ContentWrapper width='40%'>
                    <ContentItem>
                    {
                        selected !== null ? (
                            <ESSettings 
                                type={selectedType}
                                data={selected} 
                                factors={factors} 
                                objects={objects} 
                                isExpert={selectedType === 'expert'} 
                                onChangeMatrix={onChangeMatrix} 
                                onChangeName={onChangeName}
                                onChangeRatio={onChangeRatio}
                            />
                        ) : null
                    }
                    </ContentItem>
                </ContentWrapper>
            </Content>
            <ComputeContainer>
                <IElement 
                    text='Compute' 
                    width='100%' 
                    height='35px' 
                    fontSize='20px' 
                    callback={compute} 
                />
            </ComputeContainer>
        </Container>
    )
}

const Container = styled.div`
    height: 100%;
    width: 100%;
    padding: 90px;
    display: flex;
    flex-direction: column;
`

const Title = styled.h2`
    margin: 0;
`

const Content = styled.div`
    padding: 0 100px;
    display: flex;
`

const ContentWrapper = styled.div`
    flex-basis: ${props => props.width};
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

const ContentGridItem = styled.div`
    flex-basis: 45%;
    margin-top: 65px;
`

const ContentItem = styled.div`
    margin-top: 65px;
    padding-left: 100px;
    width: 100%;
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`

const Icon = styled.img`
    height: 25px;
    margin-right: 10px;
`

const ComputeContainer = styled.div`
    width: 20%;
    position: fixed;
    bottom: 20px;
    left: 40%;
`
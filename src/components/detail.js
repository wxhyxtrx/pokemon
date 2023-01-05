import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardImg, Col, Container, Image, ProgressBar, Row, Stack } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Bingkai from "../assets/bgcard.png"
import { useNavigate } from "react-router-dom";

export default function Detail() {
    const { id } = useParams()
    const [pokemon, setPokemon] = useState([])

    const getPokemon = async () => {
        const API = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await API.json()
        setPokemon({ ...pokemon, data })
    }

    useEffect(() => {
        getPokemon()
    }, [])

    const navigate = useNavigate()

    return (
        <div>
            <Button onClick={() => navigate("/")} className='btn btn-warning fw-bold rounded-0' >
                <FontAwesomeIcon icon={faArrowLeft} /> Back
            </Button>
            <Container>
                <Card className='w-75 mt-1 animated flip' style={{ background: "rgb(0,0,0,.5)", margin: "auto", position: "relative" }}>
                    <Image src={Bingkai} style={{ width: "100%" }} />
                </Card>
                <Card className='position-absolute border-0 d-flex me-5 animated flip' style={{ top: 60, background: "none", marginInline: "15rem" }}>

                    <Stack direction='horizontal'>
                        {
                            !!pokemon?.data?.sprites?.other?.home?.front_default ? (
                                <CardImg className='w-50' src={pokemon?.data?.sprites?.other?.home?.front_default} />
                            ) : !!pokemon?.data?.sprites?.other?.home?.front_shiny ? (
                                <CardImg className='w-50' src={pokemon?.data?.sprites?.other?.home?.front_shiny} />
                            ) : (
                                <CardImg className='w-50' alt='Image not found' />
                            )
                        }
                        <Card.Body className='text-white'>

                            <Stack gap={2}>
                                {
                                    pokemon?.data?.stats?.map((element, i) => (
                                        <>
                                            <Card.Subtitle>{element.stat.name}</Card.Subtitle>
                                            <ProgressBar style={{ background: "none", color: "black" }} striped variant="danger" now={element.base_stat} label={`${element.base_stat}`} />
                                        </>
                                    ))
                                }
                            </Stack>
                        </Card.Body>
                    </Stack>
                    <Card.Footer className='border-0 text-light' style={{ background: "none" }}>
                        <Row className='d-flex align-items-center'>
                            <Col>
                                <Card.Title className='text-capitalize fs-3 bg-primary text-center p-2 rounded-5'>{pokemon?.data?.name}</Card.Title>
                            </Col>
                            <Col className='d-flex'>
                                <label>Skill Ability</label>
                                -
                                {
                                    pokemon?.data?.abilities?.map(element => (
                                        <Card.Title className='text-capitalize fs-5 mx-2 text-warning'>{element.ability.name} </Card.Title>
                                    ))
                                }
                            </Col>

                        </Row>
                        <div className="d-flex align-items-center mt-1">
                            <label className='mx-1'>Height : {pokemon?.data?.height}</label>
                            <label className='mx-1 text-capitalize'>Species : {pokemon?.data?.species?.name}</label>
                        </div>
                    </Card.Footer>
                </Card>
            </Container>
        </div >
    )
}

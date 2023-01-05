import React, { useState, useEffect } from 'react'
import { Card, Container, Navbar, Row, Col, Button, Image, Form } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate()

    const [data, setData] = useState(0)
    const [page, setPage] = useState(1)
    const [pokemon, setPokemon] = useState([])
    const [filter, setFilter] = useState({
        search: ""
    })

    const handleChange = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value,
        });
    };
    console.log(filter.search);

    const getData = async () => {
        const API = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${data}&limit=20`)
        const response = await API.json()
        setPokemon({ ...pokemon, response })
    }

    const getDetail = async (value) => {
        let data = ""
        for (let i = 0; i < value.length; i++) {
            if (value[i] in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
                data = data + value[i].toString()
            }
        }
        let id = data.substring(1)
        navigate(`/detail/pokemon/${id}`)
    }


    const nextPage = () => {
        if (page === 2) {
            setData(20)
            setPage(2)
        } else {
            setData(data + 20)
            setPage(page + 1)
        }
    }
    const previousPage = () => {
        if (page === 1) {
            setData(0)
            setPage(1)
        } else {
            setData(data - 20)
            setPage(page - 1)
        }
    }

    useEffect(() => {
        getData()
    }, [data])


    return (
        <div>
            <Container fluid >
                <Navbar>
                    <Navbar.Brand href="/">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Pok%C3%A9mon_GO_logo.svg/1280px-Pok%C3%A9mon_GO_logo.svg.png"
                            height={70}
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Form className='w-75 m-auto'>
                        <Form.Control type='search' name='search' className='w-100 bg-dark border-0 text-warning' placeholder='Carilah bola Pokemon yang kalian inginkan' onChange={handleChange} />
                    </Form>
                    <Navbar.Collapse className="justify-content-end ">
                        <Navbar.Text className='text-warning fw-semibold'>
                            Hello , I am Pikachu
                            <img src='https://cdn-icons-png.flaticon.com/512/188/188987.png' width={40} />
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>

                <Row md={4} className="mt-4">
                    {
                        pokemon.response?.results.map((element, i) => {
                            if (!!filter.search === true) {
                                if (element.name.toUpperCase().includes(filter.search.toUpperCase())) {
                                    return (
                                        <Col className='mt-4 mb-3' key={i} >
                                            <Card className='text-light position-relative text-center bgCard' style={{ background: "#0c519c" }}>
                                                <Card.Body>
                                                    <Image className='w-25'
                                                        src="https://www.freepnglogos.com/uploads/pok-mon-go-logo-png-30.png"
                                                    />
                                                    <Card.Text className='fw-bold'>{i + 1}. {element.name.toUpperCase()}</Card.Text>
                                                </Card.Body>
                                                <Card.Footer className='border-0 text-center'>
                                                    <Button className='btn btn-warning w-100' onClick={() => getDetail(element.url)}>Open</Button>
                                                </Card.Footer>
                                            </Card>
                                        </Col>
                                    )
                                }
                            } else {
                                return (
                                    <Col className='mt-4 mb-3' key={i} >
                                        <Card className='text-light position-relative text-center bgCard' style={{ background: "#0c519c" }}>
                                            <Card.Body>
                                                <Image className='w-25'
                                                    src="https://www.freepnglogos.com/uploads/pok-mon-go-logo-png-30.png"
                                                />
                                                <Card.Text className='fw-bold'>{i + 1}. {element.name.toUpperCase()}</Card.Text>
                                            </Card.Body>
                                            <Card.Footer className='border-0 text-center'>
                                                <Button className='btn btn-warning w-100' onClick={() => getDetail(element.url)}>Open</Button>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                )
                            }
                        })
                    }
                </Row>
                <div className='d-flex w-100 justify-content-center'>
                    {
                        page === 1 ? (
                            <Button className='w-25 m-2 btn btn-danger' disabled onClick={previousPage}>Previous</Button>
                        ) : (
                            <Button className='w-25 m-2  btn btn-danger' onClick={previousPage}>Previous</Button>
                        )
                    }
                    {/* <Card><Card.Text className='p-2'>{page}</Card.Text></Card> */}
                    {
                        page === 2 ? (
                            <Button className='w-25 m-2  btn btn-danger' disabled onClick={nextPage}>Next</Button>

                        ) : (
                            <Button className='w-25 m-2  btn btn-danger' onClick={nextPage}>Next</Button>
                        )
                    }
                </div>
            </Container>
        </div>
    )
}

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const Grid = () => {
    const gridData = [
        {
            id: 1,
            text: 'Tax Auditing',
            logo: '/assets/homepage/iconmonstr-coin-10.svg',
            link: '/taxaudit',
        },
        {
            id: 2,
            text: 'Accounting and Financial Consultancy Services',
            logo: '/assets/homepage/iconmonstr-calculator-9.svg',
            link: '/accounting',
        },
        {
            id: 3,
            text: 'Incentives and R&D Consultancy',
            logo: '/assets/homepage/iconmonstr-building-26.svg',
            link: '/incentivesrd',
        },
        {
            id: 4,
            text: 'Social Security Advisory',
            logo: '/assets/homepage/iconmonstr-construction-15.svg',
            link: '/socialsecurity',
        },
        {
            id: 5,
            text: 'Customs and Foreign Trade Legislation Consultancy',
            logo: '/assets/homepage/iconmonstr-delivery-13.svg',
            link: '/foreigntrade',
        },
        {
            id: 6,
            text: 'Management, Corporate Finance and Technology Consulting',
            logo: '/assets/homepage/iconmonstr-building-46.svg',
            link: '/corporateconsulting',
        },
        {
            id: 7,
            text: 'Company Law Legislation Consultancy',
            logo: '/assets/homepage/iconmonstr-education-1.svg',
            link: '/legislations',
        },
    ];

    const { asPath } = useRouter()

    const [flippedCard, setFlippedCard] = useState(null);

    const handleCardFlip = (id) => {
        setFlippedCard(id);
    };

    const handleCardLeave = () => {
        setFlippedCard(null);
    };

    return (
        <div className="grid-container">
            {gridData.map((item) => (
                <div
                    className={`grid-item w-[250px] 2xl:w-[300px] h-[250px] 2xl:h-[300px] ${flippedCard === item.id ? 'flipped' : ''}`}
                    key={item.id}
                    onMouseEnter={() => handleCardFlip(item.id)}
                    onMouseLeave={handleCardLeave}
                >
                    <Link href={`${asPath.substring(0, 3)}${item.link}`}>
                        <Card
                            square
                            sx={{
                                borderRadius: '50%',
                                overflow: 'hidden',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                            className=""
                        >
                            <div className="card-inner">
                                <div className="card-front">
                                <CardMedia sx={{ height: 80 }} title={item.text}>
                                        <div className="relative w-[full] mt-[25px] 2xl:mt-[75px] h-[90px]">
                                            <Image fill style={{ objectFit: 'contain' }} src={item.logo} alt={item.text} />
                                        </div>
                                    </CardMedia>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" className="font-bold text-lg">
                                            {item.text}
                                        </Typography>
                                    </CardContent>
                                </div>
                                <div className="card-back">
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" className="font-bold text-lg">
                                            {item.text}
                                        </Typography>
                                        <Button size="small" color="primary" variant="outlined">
                                            Read More
                                        </Button>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    </Link>
                </div>
            ))}
            <style jsx>{`
            .grid-container {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
            }
      
            .grid-item {
              flex: 0 0 auto;
              padding: 3px;
              text-align: center;
              position: relative;
              perspective: 1000px;
            }
      
            .grid-item .card-inner {
              width: 100%;
              height: 100%;
              transition: transform 0.5s;
              transform-style: preserve-3d;
            }
      
            .grid-item.flipped .card-inner {
              transform: rotateY(180deg);
            }
      
            .grid-item .card-front,
            .grid-item .card-back {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              backface-visibility: hidden;
            }
      
            .grid-item .card-front {
              z-index: 2;
              transform: rotateY(0deg);
            }
      
            .grid-item .card-back {
              transform: rotateY(-180deg);
            }
      
            .grid-item.flipped .card-front {
              transform: rotateY(0deg);
            }
      
            .grid-item.flipped .card-back {
              transform: rotateY(180deg);
            }
      
            .card-back {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

          `}</style>
        </div>
    );
};

export default Grid;
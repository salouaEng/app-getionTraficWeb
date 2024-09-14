import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const PricingCard = ({prices}) => {
    const tiers = [
        {
            title: 'Basic',
            price: prices.price1,
            description: [
                '10 users included',
                '2 GB of storage',
                'Help center access',
                'Email support',
            ],
            buttonText: 'Start now',
            buttonVariant: 'outlined',
        },
        {
            title: 'Standard',
            price: prices.price2,
            subheader: 'Recommended',
            description: [
                '20 users included',
                '10 GB of storage',
                'Help center access',
                'Priority email support',
                'Dedicated team',
                'Best deals',
            ],
            buttonText: 'Start now',
            buttonVariant: 'contained',
        },
        {
            title: 'Premium',
            price: prices.price3,
            description: [
                '50 users included',
                '30 GB of storage',
                'Help center access',
                'Phone & email support',
            ],
            buttonText: 'Start now',
            buttonVariant: 'outlined',
        },
    ];
    return (
        <div>
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                {tiers.map((tier) => (
                    <Grid
                        item
                        key={tier.title}
                        xs={12}
                        sm={tier.title === 'Premium' ? 12 : 6}
                        md={4}
                    >
                        <Card
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8,
                                border: tier.title === 'Standard' ? '1px solid' : undefined,
                                borderColor:
                                    tier.title === 'Standard' ? 'primary' : undefined,
                                background:
                                    tier.title === 'Standard'
                                        ? 'linear-gradient(#033363, #021F3B)'
                                        : undefined,
                            }}
                            className="border border-gray-300 dark:bg-gray-700 dark:border-0"
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        mb: 1,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        color:
                                            tier.title === 'Standard' ? 'primary.contrastText' : '',
                                    }}
                                >
                                    <Typography component="h3" variant="h6" className='dark:text-white'>
                                        {tier.title}
                                    </Typography>
                                    {tier.title === 'Standard' && (
                                        <Chip
                                            icon={<AutoAwesomeIcon />}
                                            label={tier.subheader}
                                            size="small"
                                            sx={{
                                                background: (theme) =>
                                                    theme.palette.mode === 'light' ? '' : 'none',
                                                backgroundColor: 'primary.contrastText',
                                                '& .MuiChip-label': {
                                                    color: 'primary.dark',
                                                },
                                                '& .MuiChip-icon': {
                                                    color: 'primary.dark',
                                                },
                                            }}
                                        />
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        color:
                                            tier.title === 'Standard'
                                                ? 'primary.contrastText'
                                                : undefined,
                                    }}
                                >
                                    <Typography component="h3" variant="h2" className='font-bold dark:text-white'>
                                    ${tier.price}
                                    </Typography>
                                    <Typography component="h3" variant="h6" className='font-bold dark:text-white'>
                                        &nbsp; per month
                                    </Typography>
                                </Box>
                                <Divider
                                    sx={{
                                        my: 2,
                                        opacity: 0.2,
                                        borderColor: 'grey.500',
                                    }}
                                />
                                {tier.description.map((line) => (
                                    <Box
                                        key={line}
                                        sx={{
                                            py: 1,
                                            display: 'flex',
                                            gap: 1.5,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <CheckCircleRoundedIcon
                                            sx={{
                                                width: 30,
                                                color:
                                                    tier.title === 'Standard'
                                                        ? 'primary.light'
                                                        : 'primary.main',
                                            }}
                                        />
                                        <Typography
                                            component="span"
                                            variant="subtitle2"
                                            sx={{
                                                color:
                                                    tier.title === 'Standard'
                                                        ? 'primary.contrastText'
                                                        : undefined,
                                            }}
                                            className='dark:text-white'
                                        >
                                            {line}
                                        </Typography>
                                    </Box>
                                ))}
                            </CardContent>
                            {tier.title === 'Standard' ?
                                <button type="button" className="text-white mb-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg py-2 text-center">
                                    Start Now
                                </button>
                                :
                                <button type="button" className="text-gray-700 mb-2 bg-transparent border border-gray-500 from-cyan-500 to-blue-500 hover:bg-gradient-to-bl hover:border-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-8 py-2 text-center dark:text-white ">
                                    Start Now
                                </button>
                            }
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default PricingCard;
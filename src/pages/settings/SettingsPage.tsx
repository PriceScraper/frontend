import useAuth from "../../hooks/useAuth";
import EmptyHint from "../../components/layout/EmptyHint";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Typography from "@mui/material/Typography";
import {Avatar, Box, Checkbox, FormControlLabel, FormGroup,} from "@mui/material";
import {redirectToLogin} from "../../utils/auth.util";
import Divider from "@mui/material/Divider";
import useSettings from "../../hooks/useSettings";
import CloseIcon from '@mui/icons-material/Close';
import {useEffect, useState} from "react";
import axios from "axios";
import {useSnackbar} from "notistack";
import RecurringItem from "../../models/RecurringItem";

export default function SettingsPage() {
    const {user} = useAuth();
    const {
        availableShops,
        whiteListedShops,
        addWhiteListedShop,
        deleteWhitelistedShop,
    } = useSettings();
    const [recurringItems, setRecurringItems] = useState<RecurringItem[]>([])
    const {enqueueSnackbar} = useSnackbar()
    const [itemsRemoved, setItemsRemoved] = useState(0)

    useEffect(() => {
        axios.get<RecurringItem[]>("/shoppinglists/items/recurring")
            .then(res => {
                setRecurringItems(res.data)
            })
            .catch(err => console.log(err))
    }, [itemsRemoved])

    function handleRemoveRecurringItem(id: number) {
        axios.delete(`/shoppinglists/items/remove/recurring/${id}`)
            .then(() => {
                setItemsRemoved(itemsRemoved + 1)
            })
            .catch(err => enqueueSnackbar(`${err.message}`))
    }

    if (user === null) return <NotAuthenticated/>;
    return (
        <Box sx={{display: "grid", paddingX: "20%"}}>
            <Box
                sx={{
                    display: "grid",
                    justifyItems: "center",
                }}
            >
                <Avatar
                    sx={{height: "6rem", width: "auto"}}
                    src={user.avatar!}
                    alt={user.username}
                />
                <Typography
                    variant={"h2"}
                    sx={{
                        fontFamily: "'Source Sans Pro',sans-serif;",
                        marginTop: "1.5rem",
                        color: "rgba(0, 0, 0, 0.87)",
                        fontSize: "1.7rem",
                        fontWeight: "700",
                    }}
                >
                    {user.username}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "grid",
                    marginTop: "3rem",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "1.4rem",
                        color: "rgba(0, 0, 0, 0.87)",
                        fontWeight: "600",
                    }}
                >
                    Instellingen
                </Typography>
                <Typography sx={{color: "#343a40"}}>
                    Stel je voorkeuren hier in.
                </Typography>
                <Divider sx={{marginTop: "1rem"}}/>
                <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
                    <Box sx={{marginTop: "1rem", paddingRight: "1rem"}}>
                        <Typography sx={{fontWeight: "600"}}>Winkels</Typography>{" "}
                        <Typography sx={{color: "#343a40"}}>
                            Stel in welke winkels worden inbegrepen in de prijsvergelijking.
                        </Typography>
                    </Box>
                    <Box sx={{paddingLeft: "2rem"}}>
                        <FormGroup sx={{marginTop: "0.7rem"}}>
                            {availableShops.map((availableShop) => (
                                <FormControlLabel
                                    key={availableShop}
                                    control={
                                        <Checkbox
                                            size={"small"}
                                            checked={whiteListedShops.includes(availableShop)}
                                            inputProps={{"aria-label": "controlled"}}
                                            onChange={(e) =>
                                                whiteListedShops.includes(availableShop)
                                                    ? deleteWhitelistedShop(availableShop)
                                                    : addWhiteListedShop(availableShop)
                                            }
                                        />
                                    }
                                    label={
                                        availableShop.substring(0, 1).toUpperCase() +
                                        availableShop.substring(1)
                                    }
                                />
                            ))}
                        </FormGroup>
                    </Box>
                </Box>
                {recurringItems.length > 0 && <>
                    <Divider sx={{marginTop: "1rem"}}/>
                    <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
                        <Box sx={{marginTop: "1rem", paddingRight: "1rem"}}>
                            <Typography sx={{fontWeight: "600"}}>Periodieke producten</Typography>{" "}
                            <Typography sx={{color: "#343a40"}}>
                                Stel in welke producten u telkens in uw boodschappenlijst zou willen zien verschijnen.
                            </Typography>
                        </Box>
                        <Box sx={{paddingLeft: "2rem"}}>
                            <FormGroup sx={{marginTop: "0.7rem"}}>
                                {recurringItems.map((recurringItem) => (
                                    <FormControlLabel
                                        key={recurringItem.id}
                                        control={<CloseIcon onClick={() => handleRemoveRecurringItem(recurringItem.id)}
                                                            sx={{mx: 1, my: 0.3, color: "red"}}/>}
                                        label={recurringItem.item.name}
                                    />
                                ))}
                            </FormGroup>
                        </Box>
                    </Box>
                </>}
            </Box>
        </Box>
    )
        ;
}

function NotAuthenticated() {
    return (
        <div style={{marginTop: "5rem"}}>
            <EmptyHint
                icon={<LockOpenIcon/>}
                description={
                    <Typography>
                        U moet <span onClick={redirectToLogin}>ingelogd </span>
                        zijn om uw instellingen te kunnen aanpassen
                    </Typography>
                }
            />
        </div>
    );
}

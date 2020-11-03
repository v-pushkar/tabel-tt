import { makeStyles, Theme } from '@material-ui/core'

export const useStylesEmptyTableText = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // tslint:disable-next-line:object-literal-sort-keys
        alignItems: 'center',
        color: 'grey',
        padding: '3rem'
    },
    icon: {
        fontSize: '3rem'
    },
    textPrimary: {
        fontSize: '1.3rem',
        margin: '1rem 0'
    }
}))

export const useStylesLoadingTable = makeStyles((theme: Theme) => ({
    progress: {
        margin: theme.spacing(2),
        textAlign: 'center',
        // tslint:disable-next-line:object-literal-sort-keys
        paddingBottom: '0.333rem'
    }
}))

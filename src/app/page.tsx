"use client";
import {useEffect} from "react";
import {Button} from "@mui/material";
import Layout from "@/components/Layout";

export default function Home() {
    return (
        <>
            <Layout>
                <Button variant="contained">click me</Button>
                {"wefw fefw f".repeat(1000)}
            </Layout>

        </>
    );
}


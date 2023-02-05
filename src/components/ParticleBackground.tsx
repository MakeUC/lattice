import { useTheme } from '@material-ui/core';
import Particles from 'react-tsparticles';
import React from 'react';

export const ParticleBackground = ( {id, init, loaded} ) => {
	const theme = useTheme()

	return (
		<Particles
			id={id}
			init={init}
			loaded={loaded}
			style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, zIndex: -3 }}
			options={{
				background: {
					color: {
						value: "#000000",
					},
				},
				fpsLimit: 60,
				interactivity: {
					detectsOn: 'canvas',
					events: {
						onClick: {
							enable: true,
							mode: 'push',
						},
						resize: true,
					},
					modes: {
						bubble: {
							distance: 400,
							duration: 2,
							opacity: 0.8,
							size: 40,
						},
						push: {
							quantity: 1,
						},
						repulse: {
							distance: 200,
							duration: 0.8,
						},
					},
				},
				particles: {
					color: {
						value: '#ffffff',
					},
					links: {
						color: '#ffffff',
						distance: 150,
						enable: true,
						opacity: 1,
						width: 1,
					},
					collisions: {
						enable: true,
					},
					move: {
						direction: 'none',
						enable: true,
						outMode: 'out',
						random: false,
						speed: 0.75,
						straight: false,
					},
					number: {
						density: {
							enable: true,
							value_area: 800,
						},
						value: 80,
					},
					opacity: {
						value: 0.5,
					},
					shape: {
						type: 'circle',
					},
					size: {
						random: true,
						value: 5,
					},
				},
				detectRetina: true,
			}}
		/>
	)
}
